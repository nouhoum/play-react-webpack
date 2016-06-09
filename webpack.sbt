lazy val webpack = TaskKey[Unit]("Run webpack when packaging the application")

def runWebpack(file: File) = {
  Process("webpack", file) !
}

webpack := {
  if(runWebpack(baseDirectory.value) != 0) throw new Exception("Something goes wrong when running webpack.")
}

dist <<= dist dependsOn webpack

stage <<= stage dependsOn webpack

test <<= (test in Test) dependsOn webpack