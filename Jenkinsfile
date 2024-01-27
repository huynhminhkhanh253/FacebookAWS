pipeline {
    agent {
        docker {
            image 'node:9'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo 'hello'
                sh 'npm install'
            }
        }
    }
}
