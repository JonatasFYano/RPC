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

function main() {
  for(ia = 0 ; ia < 20 ; ia++){
  var client = new protoTest.Greeter('localhost:50051', grpc.credentials.createInsecure());
  const NS_PER_SEC = 1e9;
  const MS_PER_SEC = 1e6;
  let time;
  let diff;
  //Cenário onde não passamos nenhum argumento para um método Void
  console.log("************************************************************************************************")
  time = process.hrtime();
  client.VoidMetodoSemParametros({}, function(err, response) {});
  diff = process.hrtime(time);
  console.log(`#VoidMetodoSemParametros levou ${(diff[0] * NS_PER_SEC + diff[1])/MS_PER_SEC} milissegundos`);


//Cenário onde passamos um Integer e recebemos um Integer
  let variavel;
  variavel = 5
  console.log("************************")
  time = process.hrtime();
  client.EnviaIntRecebeInt({name: variavel}, function(err, response) {});
  diff = process.hrtime(time);
  console.log(`#EnviaIntRecebeInt levou ${(diff[0] * NS_PER_SEC + diff[1])/MS_PER_SEC} milissegundos`);


  //Cenário onde passamos um Long e recebemos um Long
  let variavelLong = 5000000000
  console.log("************************")
  time = process.hrtime();
  client.EnviaLongRecebeLong({message: variavelLong}, function(err, response) {});
  diff = process.hrtime(time);
  console.log(`#EnviaLongRecebeLong levou ${(diff[0] * NS_PER_SEC + diff[1])/MS_PER_SEC} milissegundos`);


  //Cenário onde passamos 8 variáveis Long e recebemos um Long
  let variavelLong1 = 5000000000
  let variavelLong2 = 5000000000
  let variavelLong3 = 5000000000
  let variavelLong4 = 5000000000
  let variavelLong5 = 5000000000
  let variavelLong6 = 5000000000
  let variavelLong7 = 5000000000
  let variavelLong8 = 5000000000
  console.log("************************")
  time = process.hrtime();
  client.EnviaLong8RecebeLong({message1: variavelLong1, message2: variavelLong2, message3: variavelLong3,
                              message4: variavelLong4, message5: variavelLong5, message6: variavelLong6,
                              message7: variavelLong7, message8: variavelLong8}, function(err, response) {});
  diff = process.hrtime(time);
  console.log(`#EnviaLong8RecebeLong levou ${(diff[0] * NS_PER_SEC + diff[1])/MS_PER_SEC} milissegundos`);


 //Cenário onde passamos strings com valor de potências de 10 MUITO grandes e recebemos uma string com uma frase
  for(i = 10; i<=100; i= i+10){
    let varString = _criaStringPotenciaDe10(i);
    console.log("************************")
    let print = 100-i;
    console.log("10^" + print)
    time = process.hrtime();
    client.EnviaStringPotencia10RecebeString({message: varString}, function(err, response) {
    });
    diff = process.hrtime(time);
    console.log(`#EnviaStringPotencia10RecebeString levou ${(diff[0] * NS_PER_SEC + diff[1])/MS_PER_SEC} milissegundos`);
  }

  // let var1 = 'Alguma String'
  var varComplexo = {
      message1: 'Alguma String',
      message2: "Alguma Outra String"
  };
  console.log("************************")
  time = process.hrtime();
  client.EnviaTipoComplexoRecebeTipoComplexo({messagem: varComplexo}, function(err, response) {});
  diff = process.hrtime(time);
  console.log(`#EnviaTipoComplexoRecebeTipoComplexo levou ${(diff[0] * NS_PER_SEC + diff[1])/MS_PER_SEC} milissegundos`);



function _criaStringPotenciaDe10(i){
    return Math.pow(10, i).toString();
}
}
}

main();
