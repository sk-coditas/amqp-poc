#!/usr/bin/env bash
(sleep 20 && ./bootstrap-mq.sh) & rabbitmq-server
