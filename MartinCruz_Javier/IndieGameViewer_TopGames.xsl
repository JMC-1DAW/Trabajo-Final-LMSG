<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:import href="IndieGameViewer_TopGames.xml"/>

  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <title>Top Mejores Juegos</title>
        <!-- Conexión con el archivo CSS -->
        <link rel="stylesheet" type="text/css" href="style.css"/>
      </head>
      <body>
        <header>
            <nav>
                <select id="tema-color">
                  <option value="dark">Tema oscuro</option>
                  <option value="light">Tema claro</option>
                  <option value="vacio">Tema vacío</option>
                  <option value="dorado">Tema dorado</option>
                </select>
                <select id="menu">
                    <option value="top-juegos">Top mejores juegos</option>
                    <option value="main">Juegos Indie</option>
                    <option value="carrito">Carrito</option>
                </select>
                <div id="user-info" style="display: none;">
                    <span id="user-display"></span>
                    <button id="change-user">Cambiar</button>
                </div>
            </nav>
        </header>

        <main>
          <h1>Top Mejores Juegos</h1>
          <label for="cantidad-juegos">Mostrar:</label>
          <select id="cantidad-juegos">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
          <div id="juegos-lista">
            <xsl:for-each select="/juegos/juego">
              <!-- Ordenar por cantidad_resenias * porcentaje_positivo -->
              <xsl:sort select="number(translate(valoracion/cantidad_resenias, '+,', '')) * number(valoracion/porcentaje_positivo)" data-type="number" order="descending"/>
              <div class="juego">
                <h2><xsl:value-of select="titulo"/></h2>
                <p><strong>Descripción:</strong> <xsl:value-of select="descripcion"/></p>
                <p><strong>Género:</strong> <xsl:value-of select="genero"/></p>
                <p><strong>Precio:</strong> <xsl:value-of select="precio"/> €</p>
                <p><strong>Valoración:</strong>
                  <ul>
                    <li><strong>Reseñas:</strong> <xsl:value-of select="valoracion/cantidad_resenias"/></li>
                    <li><strong>Positivo:</strong> <xsl:value-of select="valoracion/porcentaje_positivo"/>%</li>
                  </ul>
                </p>
                <p><strong>Fecha de salida:</strong> <xsl:value-of select="fecha_salida"/></p>
                <p><strong>Edad recomendada:</strong> <xsl:value-of select="pegi/edad_recomendada"/></p>
                <p><strong>Apto para todo público:</strong> <xsl:value-of select="pegi/apto_todo_publico"/></p>
              </div>
            </xsl:for-each>
          </div>
        </main>

        <footer>
            <div class="logo">
                <img src="img/logo.png" alt="Logo de la Empresa" width="100">
            </div>
            <p>&copy; 2025 IndieGameViewer</p>
            <p>Creado por: Javier Martín Cruz (1ºDAW)</p>

            <br>
            <div class="disclaimer">
                <h3>Descargo de Responsabilidad</h3>
                <p>Ten en cuenta que el carrito de esta página SOLO CALCULA EL PRECIO de los juegos en el carrito y no sirve para comprar los juegos seleccionados</p>
                <p>Este proyecto es un trabajo académico y no tiene fines comerciales.</p>
                <p>Este proyecto fue desarrollado como parte de un curso de Desarrollo Web.</p>
                <p>Los derechos de autor de los juegos mostrados pertenecen a sus respectivos propietarios.</p>
                <p>Este proyecto no está afiliado a ninguna empresa o entidad relacionada con los juegos mostrados.</p>
                <p>Este proyecto es una demostración de habilidades en HTML, CSS, XML, DTD, XSLT y JavaScript.</p>
                <p>El uso de imágenes y nombres de juegos es puramente ilustrativo y no implica ningún tipo de asociación.</p>
                <p>Este proyecto no tiene fines de lucro y se realiza con fines educativos.</p>
                <p>Este proyecto es un trabajo individual y no representa la opinión de ninguna institución.</p>
                <p>Si tienes alguna pregunta o inquietud, no dudes en ponerte en contacto con el autor.</p>
                <p>El logo fue creado por ChatGPT.</p>
                <p>Gracias por tu comprensión y apoyo.</p>
                <p>¡Disfruta de los juegos!</p>
            </div>
        </footer>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
