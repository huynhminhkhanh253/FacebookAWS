pipeline {
    agent any
    stages {
        stage('Frontend build') {
            environment {
                PATH = "C:/Users/Admin/Desktop/Project/FacebookClone/Frontend"
            }
            steps {
                echo 'building reactjs'
                dir("Frontend") {   
                    bat 'npm --version'  
                    bat 'npm run build'                
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
