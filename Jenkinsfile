pipeline {
    agent none
    stages {
        stage('Frontend build') {
            agent any {
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
            tool {
                maven 'maven_3_9_1'
            }
            steps {
                echo 'building springboot'
                sh 'cd Backend'
                sh 'set -x'
                sh 'mvn clean install'
            }
        }
    }
}
