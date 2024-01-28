pipeline {
    agent any
    stages {
        stage('Frontend build') {
            tools{
                nodejs 'node_9_5_0'
            }
            steps {
                echo 'building reactjs'
                dir("Frontend") {
                    bat 'set -x'
                    bat 'npm build'
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
                    bat 'set -x'
                    bat 'mvn clean install'
                }
            }
        }
    }
}
