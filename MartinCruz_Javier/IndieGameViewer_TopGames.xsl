<!--
  XSLT para transformar el XML de juegos indie en una página HTML.
  - Ordena los juegos por cantidad de reseñas positivas (cantidad_resenias * porcentaje_positivo / 100).
  - Muestra información detallada de cada juego, incluyendo título, descripción, género, precio, valoración y PEGI.
  - Autor: Javier Martín Cruz (1ºDAW)
-->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  <!-- Plantilla principal: transforma el nodo raíz en HTML completo -->
  <xsl:template match="/">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Top Mejores Juegos</title>
        <link rel="stylesheet" href="style.css"/>
        <script src="script.js"></script>
      </head>
      <body>
        <!-- Cabecera con navegación y controles de usuario -->
        <header>
            <nav>
            <!-- Selector de tema de color para cambiar el aspecto visual -->
                <select id="tema-color">
                  <option value="light">Tema claro</option>
                  <option value="dark">Tema oscuro</option>
                  <option value="vacio">Tema vacío</option>
                  <option value="dorado">Tema dorado</option>
                </select>
            <!-- Selector de menú para navegar entre secciones principales -->
                <select id="menu">
                    <option value="top-juegos">Top mejores juegos</option>
                    <option value="main">Juegos Indie</option>
                    <option value="carrito">Carrito</option>
                </select>
            <!-- Información y control de usuario (nombre y botón para cambiar usuario) -->
                <div id="user-info" style="display: none;">
                    <span id="user-display"></span>
                    <button id="change-user">Cambiar</button>
                </div>
            </nav>
        </header>

        <!-- Formulario para pedir nombre y edad al usuario -->
        <div id="user-form" style="display: none;">
          <form id="user-data-form">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required="required"/>
            <label for="edad">Edad:</label>
            <input type="number" id="edad" name="edad" min="0" required="required"/>
            <button type="submit">Guardar</button>
          </form>
        </div>

        <!-- Contenido principal: listado de juegos -->
        <main>
          <div id="juegos-lista">
            <!-- Itera sobre cada juego, ordenando por reseñas positivas -->
            <xsl:for-each select="/juegos/juego">
              <xsl:sort 
                select="number(translate(valoracion/cantidad_resenias, '+,', '')) * number(valoracion/porcentaje_positivo) div 100"
                data-type="number" order="descending"/>
              <div class="juego">
                <!-- Título del juego -->
                <h2><u><xsl:value-of select="titulo"/></u></h2>
                <!-- Descripción del juego -->
                <p><b>Descripción:</b> <xsl:value-of select="descripcion"/></p>
                <!-- Género del juego -->
                <p><b>Género:</b> <xsl:value-of select="genero"/></p>
                <!-- Precio del juego -->
                <p><b>Precio:</b> <xsl:value-of select="precio"/> €</p>
                <!-- Valoración: cantidad de reseñas y porcentaje positivo -->
                <p><b>Valoración:</b>
                  <ul>
                    <li><b>Reseñas: +</b> <xsl:value-of select="valoracion/cantidad_resenias"/></li>
                    <li><b>Positivo:</b> <xsl:value-of select="valoracion/porcentaje_positivo"/>%</li>
                  </ul>
                </p>
                <!-- Fecha de salida -->
                <p><b>Fecha de salida:</b> <xsl:value-of select="fecha_salida"/></p>
                <!-- Edad recomendada (PEGI) -->
                <p><b>Edad recomendada:</b> <xsl:value-of select="pegi/edad_recomendada"/></p>
                <!-- Indicación de apto para todo público -->
                <p><i><b>Apto para todo público: </b></i> <xsl:value-of select="pegi/apto_todo_publico"/></p>
              </div>
            </xsl:for-each>
          </div>
        </main>

        <!-- Pie de página con logo y disclaimer -->
        <footer>
            <div class="logo">
                <img src="img/logo.png" alt="Logo de la Empresa" width="100"></img>
            </div>
            <p>2025 IndieGameViewer</p>
            <p>Creado por: Javier Martín Cruz (1ºDAW)</p>
            <br/>
            <div class="disclaimer">
                <h3>Descargo de Responsabilidad:</h3>
                <p>Este proyecto es un trabajo académico y no tiene fines comerciales.</p>
                <p>Este proyecto fue desarrollado como parte de un curso de Desarrollo Web.</p>
                <p>Los derechos de autor de los juegos mostrados pertenecen a sus respectivos propietarios.</p>
                <p>Este proyecto no está afiliado a ninguna empresa o entidad relacionada con los juegos mostrados.</p>
                <p>Este proyecto es una demostración de habilidades en HTML, CSS, XML, DTD, XSLT y JavaScript.</p>
                <p>El uso de imágenes y nombres de juegos es puramente ilustrativo y no implica ningún tipo de asociación.</p>
                <p>Este proyecto no tiene fines de lucro y se realiza con fines educativos.</p>
                <p>Este proyecto es un trabajo individual y no representa la opinión de ninguna institución.</p>
                <p>Este proyecto no tiene relación con Steam o Valve Corporation.</p>
                <p>Las imágenes de los juegos son propiedad de sus respectivos desarrolladores y editores.</p>
                <p>Este proyecto no tiene la intención de infringir ningún derecho de autor o marca registrada.</p>
                <p>El uso de imágenes y nombres de juegos es solo para fines educativos y de demostración.</p>
                <p>El logo fue creado por ChatGPT.</p>
                <p>Gracias por tu comprensión y apoyo.</p>
                <p>¡Disfruta de los juegos!</p>
            </div>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
