pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Message') {
            steps {
                echo 'hello'
            }
        }
        stage('Build') {
            steps {
                sh 'cd Frontend'
                sh 'npm build'
            }
        }
    }
}
