#!groovy

node {

  // Actions
  def forceCompleteDeploy = false
  try {
    timeout(time: 60, unit: 'SECONDS') {
      forceCompleteDeploy = input(
        id: 'Proceed0', message: 'Force COMPLETE Deployment', parameters: [
        [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you want to recreate services and deployments']
      ])
    }
  }
  catch(err) { // timeout reached or input false
      // nothing
  }

  // Variables
  def tokens = "${env.JOB_NAME}".tokenize('/')
  def appName = tokens[0]
  def dockerUsername = "${DOCKER_USERNAME}"
  def imageTag = "${dockerUsername}/${appName}:${env.BRANCH_NAME}.${env.BUILD_NUMBER}"

  currentBuild.result = "SUCCESS"

  def secretKey = UUID.randomUUID().toString().replaceAll('-','')

  checkout scm
  properties([pipelineTriggers([[$class: 'GitHubPushTrigger']])])

  def cw_files_prefix = 'climatewatch.org/staging.climatewatch.org/climate-watch/'
  def user_report_key = 'cf0fa021-d239-457b-bb99-e9ab0205134c'

  if env.BRANCH_NAME == 'master' {
    cw_files_prefix = 'climatewatch.org/www.climatewatch.org/climate-watch/'
    user_report_key = '5fe46fa7-c7e6-40e6-8e48-37479c4599f1'
  }

  try {

    stage ('Build docker') {
      switch ("${env.BRANCH_NAME}") {
        case "master":
          sh("docker -H :2375 build --build-arg RAILS_ENV=production --build-arg USER_REPORT_KEY=${user_report_key} --build-arg secretKey=${secretKey} --build-arg FEATURE_AGRICULTURE=false --build-arg CW_FILES_PREFIX=${cw_files_prefix} --build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL} --build-arg USER_SURVEY_SPREADSHEET_URL=https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec -t ${imageTag} ." )
          sh("docker -H :2375 build --build-arg RAILS_ENV=production --build-arg USER_REPORT_KEY=${user_report_key} --build-arg secretKey=${secretKey} --build-arg FEATURE_AGRICULTURE=false --build-arg CW_FILES_PREFIX=${cw_files_prefix} --build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL} --build-arg USER_SURVEY_SPREADSHEET_URL=https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec -t ${dockerUsername}/${appName}:latest ." )
          break
        case "sandbox":
          sh("docker -H :2375 build --build-arg RAILS_ENV=production --build-arg USER_REPORT_KEY=${user_report_key} --build-arg secretKey=${secretKey} --build-arg FEATURE_AGRICULTURE=true --build-arg CW_FILES_PREFIX=${cw_files_prefix} --build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL} --build-arg USER_SURVEY_SPREADSHEET_URL=https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec -t ${imageTag} ." )
          sh("docker -H :2375 build --build-arg RAILS_ENV=production --build-arg USER_REPORT_KEY=${user_report_key} --build-arg secretKey=${secretKey} --build-arg FEATURE_AGRICULTURE=true --build-arg CW_FILES_PREFIX=${cw_files_prefix} --build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL} --build-arg USER_SURVEY_SPREADSHEET_URL=https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec -t ${dockerUsername}/${appName}:latest ." )
          break
        default:
          sh("docker -H :2375 build --build-arg RAILS_ENV=production --build-arg USER_REPORT_KEY=${user_report_key} --build-arg secretKey=${secretKey} --build-arg FEATURE_AGRICULTURE=false --build-arg CW_FILES_PREFIX=${cw_files_prefix} --build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL} --build-arg USER_SURVEY_SPREADSHEET_URL=https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec -t ${imageTag} ." )
          sh("docker -H :2375 build --build-arg RAILS_ENV=production --build-arg USER_REPORT_KEY=${user_report_key} --build-arg secretKey=${secretKey} --build-arg FEATURE_AGRICULTURE=false --build-arg CW_FILES_PREFIX=${cw_files_prefix} --build-arg APPSIGNAL_PUSH_API_KEY=${env.CW_APP_SIGNAL} --build-arg USER_SURVEY_SPREADSHEET_URL=https://script.google.com/macros/s/AKfycbzgN1G9IdLYO3KqlTC4gzBxR1UTX5bYXu1qRaiRn1oD9qoaq6s/exec -t ${dockerUsername}/${appName}:latest ." )
      }
    }

    stage ('Run Tests') {
    //  sh('docker-compose -H :2375 -f docker-compose-test.yml build')
    //  sh('docker-compose -H :2375 -f docker-compose-test.yml run --rm test')
    //  sh('docker-compose -H :2375 -f docker-compose-test.yml stop')
    }

    stage('Push Docker') {
      withCredentials([usernamePassword(credentialsId: 'Vizzuality Docker Hub', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
        sh("docker -H :2375 login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}")
        sh("docker -H :2375 push ${imageTag}")
        sh("docker -H :2375 push ${dockerUsername}/${appName}:latest")
        sh("docker -H :2375 rmi ${imageTag}")
      }
    }

    stage ("Deploy Application") {
      sh("echo Deploying to STAGING cluster")
      sh("kubectl config use-context gke_${GCLOUD_PROJECT}_${GCLOUD_GCE_ZONE}_${KUBE_PROD_CLUSTER}")
      switch ("${env.BRANCH_NAME}") {

        // Roll out to sandbox
        case "sandbox":
          sh("echo Deploying to STAGING app")
          def service = sh([returnStdout: true, script: "kubectl get deploy ${appName}-staging || echo NotFound"]).trim()
          if ((service && service.indexOf("NotFound") > -1) || (forceCompleteDeploy)){
            sh("sed -i -e 's/{name}/${appName}/g' k8s/staging/*.yaml")
            sh("kubectl apply -f k8s/staging/")
          }
          sh("kubectl set image deployment ${appName}-staging ${appName}-staging=${imageTag} --record")
          break

        // Roll out to production
        case "master":
          def userInput = true
          def didTimeout = false
          try {
            slackSend (color: '#551A8B', channel: '#climate-watch-dev', message: "WAITING APPROVAL ON JENKINS (90seconds): Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
            timeout(time: 90, unit: 'SECONDS') {
              userInput = input(
                id: 'Proceed1', message: 'Confirm deployment', parameters: [
                [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this deployment']
              ])
            }
          }
          catch(err) { // timeout reached or input false
              sh("echo Aborted by user or timeout")
              slackSend (color: '#FFA500', channel: '#climate-watch-dev', message: "CANCELLED (lack of approval): Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
              if('SYSTEM' == user.toString()) { // SYSTEM means timeout.
                  didTimeout = true
              } else {
                  userInput = false
              }
          }
          if (userInput == true && !didTimeout){
            sh("echo Deploying to PROD app")
            def service = sh([returnStdout: true, script: "kubectl get deploy ${appName} || echo NotFound"]).trim()
            if ((service && service.indexOf("NotFound") > -1) || (forceCompleteDeploy)){
              sh("sed -i -e 's/{name}/${appName}/g' k8s/production/*.yaml")
              sh("kubectl apply -f k8s/production/")
            }
            sh("kubectl set image deployment ${appName} ${appName}=${imageTag} --record")
          } else {
            sh("echo NOT DEPLOYED")
            currentBuild.result = 'SUCCESS'
          }
          break

        // Default behavior?
        default:
          echo "Default -> do nothing"
          currentBuild.result = "SUCCESS"
      }
    }

    // Notify Success
    slackSend (color: '#00FF00', channel: '#climate-watch-dev', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )


  } catch (err) {

    currentBuild.result = "FAILURE"
    // Notify Error
    slackSend (color: '#FF0000', channel: '#climate-watch-dev', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
    throw err
  }

}
