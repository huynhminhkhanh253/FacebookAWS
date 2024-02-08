pipeline {
    agent any
    stages {
        stage('Frontend build') {
            tools{
                nodejs 'node_9_7_0'
            }
            steps {
                echo 'building reactjs'
                dir("Frontend") {   
                    bat 'pwd' 
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
