variable "aws_region" {
  description = "A região da AWS para provisionar os recursos."
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "O nome do projeto para o prefixo dos recursos."
  type        = string
  default     = "gestor-de-tarefas"
}