pipeline {
  environment {
    backendImageName = "najlaha/testjenkins"
    backendImageTag = "${BUILD_NUMBER}"
    frontendImageName = "najlaha/frontjenkins"
    frontendImageTag = "${BUILD_NUMBER}"
  }

  agent any

  stages {
    stage('Checkout') {
      steps {
        git 'https://github.com/NajlaDevOps/pfefinal.git'
      }
    }
    stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

    stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

    stage('Build Backend Docker Image') {
      steps {
        script {
          sh "docker build -t ${backendImageName}:${backendImageTag} ."
        }
      }
    }

    stage('Push Backend Docker Image') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'Dockerbub-credential', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
            sh "docker push ${backendImageName}:${backendImageTag}"
          }
        }
      }
    }
    
    stage('Docker Remove Image') {
      steps {
        sh "docker rmi ${backendImageName}:${backendImageTag}"
      }
    }
    stage('Build frontend Docker Image') {
      steps {
        dir('client') {
          script {
            sh "docker build -t ${frontendImageName}:${frontendImageTag} ."
          }
        }
      }
    }
     stage('Push frontend Docker Image') {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'Dockerbub-credential', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh "docker login -u ${DOCKER_USERNAME} -p ${DOCKER_PASSWORD}"
            sh "docker push ${frontendImageName}:${frontendImageTag}"
          }
        }
      }
    }
    
    stage('Docker Remove Image') {
      steps {
        sh "docker rmi ${frontendImageName}:${frontendImageTag}"
      }
    }

   stage('Deploying App to Kubernetes') {
      steps {
         script {
           sh "sed -i 's|__IMAGE_NAME__|${backendImageName}|g; s|__IMAGE_TAG__|${backendImageTag}|g' backdeploy.yaml"
            kubernetesDeploy(configs: "backdeploy.yaml", kubeconfigId: "k8s-id", withLatestTag: true)
             }
             dir('client') {
          script {
            sh "sed -i 's|__IMAGE_NAME__|${frontendImageName}|g; s|__IMAGE_TAG__|${frontendImageTag}|g' frontdeploy.yaml"
            kubernetesDeploy(configs: "frontdeploy.yaml", kubeconfigId: "k8s-id", withLatestTag: true)
                }
            }

        }
   }
   
 
}
}

