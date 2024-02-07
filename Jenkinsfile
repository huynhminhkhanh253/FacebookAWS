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
                sh 'pwd'
                dir('Frontend') {
                    sh 'pwd'
                    sh 'npm cache clean'
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
                sh 'pwd'
                dir('Frontend') {
                    sh 'pwd'
                    sh 'sudo mvn clean install'
                }
            }
        }
    }
}
