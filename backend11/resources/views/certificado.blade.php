<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificado</title>
    <style>
        body {
            font-family: 'Georgia', serif;
            text-align: center;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            width: 80%;
            margin: 50px auto;
            padding: 40px;
            background: #fff;
            border: 10px solid rgb(68, 68, 224); /* Color dorado */
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .header {
            margin-bottom: 40px;
        }
        .header h1 {
            font-size: 2.5rem;
            color: #d4af37;
        }
        .header p {
            font-size: 1.2rem;
        }
        .recipient {
            margin: 30px 0;
        }
        .recipient h2 {
            font-size: 1.8rem;
            margin: 0;
        }
        .recipient p {
            font-size: 1rem;
            margin: 5px 0;
        }
        .content {
            font-size: 1.2rem;
            margin: 30px 0;
        }
        .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 50px;
        }
        .signature {
            text-align: center;
            font-size: 1rem;
        }
        .signature p {
            margin: 10px 0;
        }
        .signature span {
            display: block;
            border-top: 1px solid #333;
            margin-top: 20px;
            padding-top: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Certificado de Finalización</h1>
            <p>En reconocimiento a</p>
        </div>
        <div class="recipient">
            <h2>{{ $nombre }} {{ $apellido }}</h2>
            <p>DNI N° {{ $dni }}</p>
        </div>
        <div class="content">
            <p>Por haber participado en el programa <strong>"Yo Puedo Programar"</strong>, adquiriendo nociones sobre programación: HTML, CSS y JavaScript, acreditando una duración de 20 horas.</p>
            <p>Fecha de emisión: {{ $fecha }}</p>
        </div>
        <div class="signatures">
            <div class="signature">
                <p>LUCAS HADAD</p>
                <span>Director General</span>
            </div>
            <div class="signature">
                <p>JUAN PIVETTA</p>
                <span>Presidente</span>
            </div>
        </div>
    </div>
</body>
</html>
