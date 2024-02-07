pipeline {
    agent none
    stages {
        stage('Frontend build') {
            agent {
            docker {
                image 'node:6-alpine'
                args '-p 3000:3000'
                }
            }
            steps {
                echo 'building reactjs'
                dir("Frontend") {   
                    sh 'npm --version' 
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
                dir("Backend/facebook-api") {
                    sh 'mvn clean install'
                }
            }
        }
    }
}
