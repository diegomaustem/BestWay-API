MelhorCaminho - API

Descrição Dados dois pontos, origem e destino de endereço. A API retornará a duração e a distância da rota mais rápida ou mais curta entre os endereços. INTEGRAÇÃO COM A API DISTANCEMATRIX, que faz todos os calculos de geolocalização. https://distancematrix.ai/distance-matrix-api.

Descrição

Dados dois pontos, origem e destino de endereço. A API retornará a duração e a distância da rota mais rápida ou mais curta entre os endereços.
INTEGRAÇÃO COM A API DISTANCEMATRIX, que faz todos os calculos de geolocalização. https://distancematrix.ai/distance-matrix-api.
Funcionamento Forneça os dados de entrada (endereços ou coordenadas) para os quais deseja fazer uma estimativa. Você receberá uma resposta no formato JSON, que conterá informações sobre a duração de cada trecho de rota construído. O tempo de viagem calculado para um trecho de rota sempre leva em consideração as condições atuais do tráfego e a previsão do tempo.

Por exemplo, há três pontos de partida: A, B e C, e três pontos de destino: E, B e D. A API Distance retorna a matriz de durações em segundos e distâncias em metros entre os pontos. Ela não retorna geometrias de rota.

Funcionamento

Forneça os dados de entrada (endereços ou coordenadas) para os quais deseja fazer uma estimativa. Você receberá uma resposta
no formato JSON, que conterá informações sobre a duração de cada trecho de rota construído. O tempo de viagem calculado para um trecho
de rota sempre leva em consideração as condições atuais do tráfego e a previsão do tempo.

Por exemplo, há três pontos de partida: A, B e C, e três pontos de destino: E, B e D. A API Distance retorna a matriz de durações em
segundos e distâncias em metros entre os pontos. Ela não retorna geometrias de rota.
Exemplos de entrada Endpoint : http://localhost:3000/api/rotaFacil Método : POST Por coordenadas : {"origem": "-27.603866763383051, -48.63145838465947", "destino": "-27.598200370684115, -48.6199490288342"} Por endereços : {"origem": "R. do Expedicionário, 702, Praia Comprida, São José - SC, Brazil | Av. Atílio Pedro Pagani, 270, Passa Vinte, Palhoça - SC, Brazil", "destino": "Rua Cassol, 458, Kobrasol, São José - SC, Brazil | R. Lauro Linhares, 1674-1792 - Trindade"}

Exemplos de entrada

Endpoint : http://localhost:3000/api/rotaFacil
Método : POST
Por coordenadas : {"origem": "-27.603866763383051, -48.63145838465947", "destino": "-27.598200370684115, -48.6199490288342"}
Por endereços : {"origem": "R. do Expedicionário, 702, Praia Comprida, São José - SC, Brazil | Av. Atílio Pedro Pagani, 270,
Passa Vinte, Palhoça - SC, Brazil", "destino": "Rua Cassol, 458, Kobrasol, São José - SC, Brazil | R. Lauro Linhares, 1674-1792 - Trindade"}

É necessário uma "KEY" para ter acesso na API. Essa chave é conseguida através de um registro na plataforma.
Informações do API

https://distancematrix.ai/distance-matrix-api.
