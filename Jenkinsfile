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
                sh 'pwd' 
                sh 'npm install'  
            }
        }
        stage('Backend build') {
            tools{
                maven 'maven_3_9_1'
            }
            steps {
                echo 'building springboot'
                sh 'cd..'
                sh 'cd Backend/facebook-api'
                sh 'mvn clean install'
            }
        }
    }
}
