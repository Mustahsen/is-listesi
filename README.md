# TO-DO List Application

A TO-DO List application made by using Angular and Spring Boot. It uses Basic Auth for user authentication.

Working version of the application can be found at:

[TO-DO List Application](https://todo-app-spring-boot-angular.herokuapp.com/)

## Clone

```sh
git clone https://github.com/Mustahsen/is-listesi.git
```

### Requirements

For building and running the application you need:

- [JDK 1.8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Maven 3](https://maven.apache.org)

## Running the application locally

There are several ways to run a Spring Boot application on your local machine. One way is to execute the `main` method in the `com.mergen.IsListesiApplication` class from your IDE. But then Angular part needs to be run separetely, also necessary dependencies must be installed. Alternatively you can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

```shell
mvn spring-boot:run
```

Then all the Angular dependencies will be installed on your local project folder. Then you can use:

```shell
ng serve
```

at the project directory without starting spring boot.

## Running the tests

There are 3 Angular unit tests written in the task-detail.component.spec file, they can be called with ng test

## Deployment

Angular:
	
	src\app\services\authentication.service.ts
	src\app\services\item.service.ts
	src\app\services\task.service.ts
	src\app\services\user.service.ts

This 4 service calls https://todo-app-spring-boot-angular.herokuapp.com for api calls since that is the address normally used. For test environment the links in these services must be changed back to localhost.

Spring Boot:

	For DB PostgreSQL is used and Datasource settings are at src\main\resources\application.properties file:

	spring.datasource.url=${JDBC_DATABASE_URL}
	spring.datasource.username=${JDBC_DATABASE_USERNAME}
	spring.datasource.password=${JDBC_DATABASE_PASSWORD}

These 3 parameters must be changed for test environment or DB credential can be put into path variable with there variable names.

PostgreSQL:

	Right now spring.jpa.hibernate.ddl-auto=validate parameter is at validate to prevent data loss at production but for first time setup and test environment it can changed back to spring.jpa.hibernate.ddl-auto=create to let Spring handle table creation. Incase you want to create db manually. Db.sql can be found at files