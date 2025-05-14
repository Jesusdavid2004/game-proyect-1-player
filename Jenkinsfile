pipeline {
  agent any

  stages {
    stage('Instalar dependencias') {
      steps {
        sh 'npm install'
      }
    }

    stage('Ejecutar pruebas unitarias') {
      steps {
        sh 'npm test'
      }
    }

    stage('Construir proyecto') {
      steps {
        sh 'npm run build'
      }
    }
  }
}
