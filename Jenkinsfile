pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
        tool {
            maven 'maven_3_9_1'
        }
    }
    stages {
        stage('Frontend build') {
            steps {
                echo 'building reactjs'
                sh 'cd Frontend'
                sh 'set -x'
                sh 'npm build'
            }
        }
        stage('Backend build') {
            steps {
                echo 'building springboot'
                sh 'cd Backend'
                sh 'set -x'
                sh 'mvn clean install'
            }
        }
    }
}
