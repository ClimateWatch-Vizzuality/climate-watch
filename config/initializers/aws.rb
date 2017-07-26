Aws.config.update({
  region: ENV["AWS_REGION"],
  credentials: Aws::Credentials.new(ENV["AWS_ACCESS_KEY_ID"], ENV["AWS_SECRET_ACCESS_KEY"]),
  endpoint: "https://s3.amazonaws.com"
})

S3_BUCKET_URL = "https://s3-#{ENV["AWS_REGION"]}.amazonaws.com/#{ENV["S3_BUCKET_NAME"]}"
