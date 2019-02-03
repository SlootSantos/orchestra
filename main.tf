provider "aws" {
    skip_credentials_validation = true
    skip_metadata_api_check     = true
    s3_force_path_style         = true
    access_key                  = "mock_access_key"
    secret_key                  = "mock_secret_key"
    region                      = "us-east-1"
    endpoints {
        dynamodb = "http://localhost:4569"
    }
}
resource "aws_dynamodb_table" "orchestra_db" {
  name           = "Orchestra"
  billing_mode   = "PROVISIONED"
  read_capacity  = 2
  write_capacity = 2
  hash_key       = "sampleId"
attribute {
    name = "sampleId"
    type = "S"
  }
ttl {
    attribute_name = "TimeToExist"
    enabled        = false
  }
}
