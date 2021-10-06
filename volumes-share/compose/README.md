# Test composefiles

These composefiles are for testing the volume push/pull experiment.

You need to compile compose that knows how to pull a volume, it can be found
[here](https://github.com/rumpl/compose/tree/volume).

Then you can:

```shell
$ cd static
$ ./docker-compose up
```

You should then be able to see a listing of what's inside the pulled volume
(some C code).

The second example is in `phpmyadmin`:

```shell
$ cd phpmyadmin
$ ./docker-compose up
```

Once it starts you can open your browser to http://localhost:8080,
username: db_user, password: db_user_password. If everything went well you
should see one table named `users` and it should contain one row.
