pipeline {
    agent none
    stages {
        stage('Frontend build') {
            tools{
                nodejs 'node_9_5_0'
            }
            steps {
                echo 'building reactjs'
                sh 'cd Frontend'
                sh 'set -x'
                sh 'npm build'
            }
        }
        stage('Backend build') {
            tools{
                maven 'maven_3_9_1'
            }
            steps {
                sh 'set +x'
                echo 'building springboot'
                dir("Backend/facebook-api") {
                    sh 'set -x'
                    sh 'mvn clean install'
                }

            }
        }
    }
}
