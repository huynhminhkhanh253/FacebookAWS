pipeline {
    agent any
    stages {
        stage('Frontend build') {
            environment {
                PATH = "C:/Program Files/Git/bin"
            }
            steps {
                echo 'building reactjs'
                dir("Frontend") {   
                    sh 'npm --version'  
                    sh 'npm run build'                
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
