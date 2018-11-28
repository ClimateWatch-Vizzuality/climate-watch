S3_BUCKET_URL = "https://s3-#{Rails.application.secrets.aws_region}.amazonaws.com/#{Rails.application.secrets.s3_bucket_name}"

CW_FILES_PREFIX = ENV['CW_FILES_PREFIX']

return if Rails.env.test?
Aws.config.update({
  region: Rails.application.secrets.aws_region,
  credentials: Aws::Credentials.new(
    Rails.application.secrets.aws_access_key_id,
    Rails.application.secrets.aws_secret_access_key
  ),
  endpoint: "https://s3.amazonaws.com"
})
