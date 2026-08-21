pipeline {
    agent any

    environment {
        DOCKER_REGISTRY = 'docker.io'
        DOCKER_IMAGE_BACKEND = 'guychelmura/smarttask-backend'
        DOCKER_IMAGE_FRONTEND = 'guychelmura/smarttask-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_BACKEND}:${env.BRANCH_NAME}", "./backend")
                }
            }
        }

        stage('Build Frontend') {
            steps {
                script {
                    docker.build("${DOCKER_IMAGE_FRONTEND}:${env.BRANCH_NAME}", "./frontend")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry("https://${DOCKER_REGISTRY}", 'docker-hub-credentials') {
                        docker.image("${DOCKER_IMAGE_BACKEND}:${env.BRANCH_NAME}").push()
                        docker.image("${DOCKER_IMAGE_FRONTEND}:${env.BRANCH_NAME}").push()
                    }
                }
            }
        }
    }

    post {
        failure {
            echo '❌ Pipeline failed!'
        }
        success {
            echo '✅ Pipeline succeeded! Images pushed to Docker Hub'
        }
    }
}
