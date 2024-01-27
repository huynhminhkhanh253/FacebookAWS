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
                sh 'cd Frontend'
                sh 'set -x'
                sh 'npm build'
            }
        }
        stage('Backend build') {
            agent any
            tools{
                maven 'maven_3_9_1'
            }
            steps {
                
                echo 'building springboot'
                sh 'cd Backend/facebook-api'
                sh 'set -x'
                sh 'mvn clean install'
            }
        }
    }
}
