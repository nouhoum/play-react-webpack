import PlayKeys.playRunHooks

name := """play-react-webpack"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.12"

libraryDependencies += guice
libraryDependencies += "com.h2database" % "h2" % "1.4.197"
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.2" % Test

playRunHooks += { baseDirectory.map(Webpack.apply).value }

routesGenerator := InjectedRoutesGenerator

watchSources ~= { (ws: Seq[File]) =>
  ws filterNot { path =>
    path.getName.endsWith(".js") || path.getName == ("build")
  }
}
