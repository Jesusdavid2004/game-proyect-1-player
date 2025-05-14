pipeline {
  agent any

  stages {
    stage('Clonar repositorio') {
      steps {
        git 'https://github.com/tu-usuario/tu-repo.git'
      }
    }

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
