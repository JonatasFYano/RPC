/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/protosTest.proto';

var grpc = require('grpc');
var protoTest = grpc.load(PROTO_PATH).helloworld;

/**
 * Implements the SayHello RPC method.
 */

function VoidMetodoSemParametros(call, callback) {
  callback(null, {});
}

function EnviaIntRecebeInt(call, callback) {
  callback(null, {message: 5 + call.request.name});
}

function EnviaLongRecebeLong(call, callback) {
  callback(null, {message: 5000000 + call.request.message});
}

function EnviaLong8RecebeLong(call, callback) {
  callback(null, {message: 500000000000});
}

function EnviaStringPotencia10RecebeString(call, callback) {
  callback(null, {message: 'Resposta em forma de String'});
}

function EnviaTipoComplexoRecebeTipoComplexo(call, callback){
  callback(null, {message: 'Resposta em forma de String'});
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(protoTest.Greeter.service, {EnviaIntRecebeInt: EnviaIntRecebeInt, VoidMetodoSemParametros: VoidMetodoSemParametros,
     EnviaLongRecebeLong: EnviaLongRecebeLong, EnviaLong8RecebeLong:EnviaLong8RecebeLong,
     EnviaStringPotencia10RecebeString:EnviaStringPotencia10RecebeString,
     EnviaTipoComplexoRecebeTipoComplexo:EnviaTipoComplexoRecebeTipoComplexo});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log("Iniciou")
}

main();
