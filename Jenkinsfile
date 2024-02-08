pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo 'building reactjs'
                dir('Frontend'){
                   sh 'chown -R 992:992 "/.npm"'
                   sh 'npm install'
                }
                
            }
        }
        stage('Backend build') {
            tools{
                maven 'maven_3_9_1'
            }
            steps {
                echo 'building springboot'
                sh 'pwd'
                dir('Backend/facebook-api') {
                    sh 'pwd'
                    sh 'sudo mvn clean install'
                }
            }
        }
    }
}




