# Backend

This starter project contains the following:

* A Maven-based setup with several 
third-party libraries and frameworks (see: `pom.xml`)
* A preconfigured Spring project

## Counter

The project contains a simple counter, which is made slightly more complicated than necessary by trying to maintain
just a single counter in the database. This is mostly done just to conform to the 'out-of-the-box' Lit-element UI, and 
shouldn't be seen as a 'good example'.

Obviously it is intended to throw away the counter module as soon as you have a grip on the basic framework features.

## JPA

The current JPA configuration uses ```update``` as its value for ```spring.jpa.hibernate.ddl-auto```. This means that the database schema will be updated
automatically when the application starts. This is convenient *most of the time*, but occasionally it won't be able
to figure out a way to update the schema without creating weird exceptional sitiuations.

By setting this to ```create```, the database schema will be dropped and recreated every time the application starts.
This is useful to get a clean slate, but all your existing test-data will be lost.

```
spring.jpa.hibernate.ddl-auto=create
```

## Web

Note the little ```server.servlet.contextPath=/api``` setting in the application.properties file.
This means that all ```@RestController``` endpoints will be prefixed with ```/api```.

This is useful, because for production, we (probably) want to host our frontend and backend on the same domain. 
Having this prefix makes it easier to distinguish between frontend and backend requests.

## Prerequisites
Although it is recommended to always use the latest stable version
of Java, this project requires a version of Java 21 or higher.
You can customize this in your compilation settings and `pom.xml`.