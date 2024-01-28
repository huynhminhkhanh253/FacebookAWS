pipeline {
    agent any
    environment {
        PATH = "C:/Program Files/Git/bin"
    }
    stages {
        stage('Frontend build') {
            tools{
                nodejs 'node_9_5_0'
            }
            steps {
                echo 'building reactjs'
                sh 'cd Frontend'
                sh 'npm run build'
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
