#!/bin/sh

host="$1"
shift
cmd="$@"

until nc -z -v -w30 $host 3306; do
  echo "Waiting for database connection at $host"
  sleep 1
done

exec $cmd
