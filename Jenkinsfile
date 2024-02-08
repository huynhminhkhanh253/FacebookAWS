pipeline {
    agent any
    stages {
        stage('Frontend build') {
            steps {
                echo 'building reactjs'
                dir("Frontend") {   
                    bat 'npm cache clean --force'
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
