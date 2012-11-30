<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Victoria Chinese Alliance Church</title>
    <link href="/_assets/css/main.css" rel="stylesheet" type="text/css">
    <meta name="description" content="Victoria Chinese Alliance Church webpage" />
    <meta name="robots" content="all" />
    <meta name="copyright" content="Victoria Chinese Alliance Church" />
    <meta name="rating" content="General" />
    <meta http-equiv="Content-Language" content="en-us" />
    <meta name="revisit-after" content="5 Days" />
    <link rel="shortcut icon" href="favicon.ico" />

</head>

<body id="joshua">
<div id="bodyContainer">
    <div id="bodyBorderLeft">
        <div id="bodyBorderLeftTopCap">
        </div> <!--bodyBorderLeftTopCap-->
        <div id="bodyBorderLeftBotCap">
        </div> <!--bodyBorderLeftBotCap-->
    </div> <!--bodyBorderLeft-->

    <div id="bodyContainerBgOutTop">
        <div id="bodyContainerBgInTop">
        </div> <!--bodyContainerBgInTop-->
    </div> <!--bodyContainerBgOutTop-->

    <!-- includes the common head banner  -->
    <?php
    $path = $_SERVER['DOCUMENT_ROOT'];
    $path .= "/include/head-banner.html";
    include_once($path);
    ?>

    <div id="bodyContentPane">

        <!-- includes the common English main menu  -->
        <?php
        $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/include/main-menu-ch.html";
        include_once($path);
        ?>

        <div class="containerFullWidth">
            <!-- main text area that occupies 2/3rds of the page width -->
            <div class="topic_main_full_width">
                <h1 id="title" class="title_article"></h1>
                <p id="description"></p>
            </div> <!-- topic_main -->

            <!-- main text area that occupies 2/3rds of the page width -->
            <div class="topic_main_full_width">
                <h1 id="committee-title" class="title_article"></h1>
                <p id="committee-members"></p>
            </div> <!-- topic_main -->
        </div> <!-- containerFullWidth -->

        <!-- site-wide bottom navigation links Chinese version -->
        <?php
        $path = $_SERVER['DOCUMENT_ROOT'];
        $path .= "/include/bottom-nav-ch.html";
        include_once($path);
        ?>

    </div>	<!-- bodyContentPane -->

    <div id="bodyFooter">
        <div id="Footer">
            <!-- site-wide bottom navigation links Chinese version -->
            <?php
            $path = $_SERVER['DOCUMENT_ROOT'];
            $path .= "/include/footer-ch.html";
            include_once($path);
            ?>
        </div> <!--Footer-->
    </div> <!--bodyFooter-->

    <div id="bodyContainerBgOutBot">
        <div id="bodyContainerBgInBot"></div>
    </div> <!--bodyContainerBgOutBot-->

    <div id="bodyBorderRight">
        <div id="bodyBorderRightTopCap"></div>
        <div id="bodyBorderRightBotCap"></div>
    </div> <!--bodyBorderRight-->

</div> <!--bodyContainer-->

<!--appending javascript at the end of body to improve performance-->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<script type="text/javascript" src="/js/viccac.google.js"></script>
</body>
</html>