pipeline {
    agent any
    stages {
        tools{
            nodejs 'node_9_5_0'
        }
        stage('Frontend build') {
            steps {
                echo 'building reactjs'
                dir("Frontend") {
                    bat 'npm run build'
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
                    bat 'mvn clean install'
                }
            }
        }
    }
}
