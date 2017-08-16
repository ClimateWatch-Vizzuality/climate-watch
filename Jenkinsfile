#!groovy

node {

  // Actions
  def forceCompleteDeploy = false
  try {
    timeout(time: 15, unit: 'SECONDS') {
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

  checkout scm

  try {

    stage ('Build docker') {
      sh("docker -H :2375 build -t ${imageTag} .")
      sh("docker -H :2375 build -t ${dockerUsername}/${appName}:latest .")
    }

    // stage ('Run Tests') {
    //   sh('docker-compose -H :2375 -f docker-compose-test.yml build')
    //   sh('docker-compose -H :2375 -f docker-compose-test.yml run --rm test')
    //   sh('docker-compose -H :2375 -f docker-compose-test.yml stop')
    // }

    stage('Push Docker') {
      withCredentials([usernamePassword(credentialsId: 'Vizzuality Docker Hub', usernameVariable: 'DOCKER_HUB_USERNAME', passwordVariable: 'DOCKER_HUB_PASSWORD')]) {
        sh("docker -H :2375 login -u ${DOCKER_HUB_USERNAME} -p ${DOCKER_HUB_PASSWORD}")
        sh("docker -H :2375 push ${imageTag}")
        sh("docker -H :2375 push ${dockerUsername}/${appName}:latest")
        sh("docker -H :2375 rmi ${imageTag}")
      }
    }

    stage ("Deploy Application") {
      switch ("${env.BRANCH_NAME}") {

        // Roll out to staging
        case "develop":
          sh("echo Deploying to STAGING cluster")
          sh("kubectl config use-context gke_${GCLOUD_PROJECT}_${GCLOUD_GCE_ZONE}_${KUBE_STAGING_CLUSTER}")
          def service = sh([returnStdout: true, script: "kubectl get deploy ${appName} || echo NotFound"]).trim()
          if ((service && service.indexOf("NotFound") > -1) || (forceCompleteDeploy)){
            sh("sed -i -e 's/{name}/${appName}/g' k8s/services/*.yaml")
            sh("sed -i -e 's/{name}/${appName}/g' k8s/staging/*.yaml")
            sh("kubectl apply -f k8s/services/")
            sh("kubectl apply -f k8s/staging/")
          }
          sh("kubectl set image deployment ${appName} ${appName}=${imageTag} --record")
          break

        // Roll out to production
        case "master":
          def userInput = true
          def didTimeout = false
          try {
            timeout(time: 60, unit: 'SECONDS') {
              userInput = input(
                id: 'Proceed1', message: 'Confirm deployment', parameters: [
                [$class: 'BooleanParameterDefinition', defaultValue: true, description: '', name: 'Please confirm you agree with this deployment']
              ])
            }
          }
          catch(err) { // timeout reached or input false
              def user = err.getCauses()[0].getUser()
              if('SYSTEM' == user.toString()) { // SYSTEM means timeout.
                  didTimeout = true
              } else {
                  userInput = false
                  echo "Aborted by: [${user}]"
              }
          }

          if (userInput == true && !didTimeout){
            sh("echo Deploying to PROD cluster")
            sh("kubectl config use-context gke_${GCLOUD_PROJECT}_${GCLOUD_GCE_ZONE}_${KUBE_PROD_CLUSTER}")
            def service = sh([returnStdout: true, script: "kubectl get deploy ${appName} || echo NotFound"]).trim()
            if ((service && service.indexOf("NotFound") > -1) || (forceCompleteDeploy)){
              sh("sed -i -e 's/{name}/${appName}/g' k8s/services/*.yaml")
              sh("sed -i -e 's/{name}/${appName}/g' k8s/production/*.yaml")
              sh("kubectl apply -f k8s/services/")
              sh("kubectl apply -f k8s/production/")
            }
            sh("kubectl set image deployment ${appName} ${appName}=${imageTag} --record")
          } else {
            echo "this was not successful"
            //currentBuild.result = 'FAILURE'
          }
          break

        // Default behavior?
        default:
          sh("Default -> do nothing")
      }
    }

    // Notify Success
    slackSend (color: '#00FF00', channel: '#the-new-api', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )


  } catch (err) {

    currentBuild.result = "FAILURE"
    // Notify Error
    slackSend (color: '#FF0000', channel: '#the-new-api', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
    emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
    throw err
  }

}
