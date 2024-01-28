pipeline {
    agent none
    stages {
        agent {
            docker {
                image 'node:6-alpine'
                args '-p 3000:3000'
            }
        }
        stage('Frontend build') {
            steps {
                echo 'building reactjs'
                dir("Frontend") {   
                    bat 'npm --version' 
                    bat 'npm install'  
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
                    bat 'mvn clean install'
                }
            }
        }
    }
}
