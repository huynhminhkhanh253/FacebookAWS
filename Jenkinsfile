pipeline {
    agent {
        docker {
            args '-p 3000:3000'
        }
    }
    environment {
        PATH = "C:/Program Files/Git/bin"
    }
    stages {
        stage('Frontend build') {
            steps {
                echo 'building reactjs'
                dir("Frontend") {
                    sh 'set -x'
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
