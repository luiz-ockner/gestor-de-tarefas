# Cria uma VPC para o cluster EKS
resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "${var.project_name}-vpc"
  }
}

# Cria subnets públicas (necessárias para o EKS)
resource "aws_subnet" "public" {
  count = 2
  vpc_id     = aws_vpc.main.id
  cidr_block = "10.0.${count.index}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  tags = {
    Name = "${var.project_name}-public-subnet-${count.index}"
    "kubernetes.io/cluster/${var.project_name}-eks-cluster" = "shared"
    "kubernetes.io/role/elb" = "1"
  }
}

data "aws_availability_zones" "available" {}