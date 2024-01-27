pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    stages {
        stage('Build') {
            steps {
                echo 'hello'
                // dir('Frontend'){
                //     sh 'npm install'
                // }
            }
            
        }
    }
}
