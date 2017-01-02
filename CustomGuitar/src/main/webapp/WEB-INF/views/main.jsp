<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Custom Guitar</title>

    <!-- Bootstrap Core CSS -->
    <link href="../vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="../vendor/morrisjs/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

<div id="wrapper">

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.html">Custom Guitar</a>
        </div>
        <!-- /.navbar-header -->

        <ul class="nav navbar-top-links navbar-right">
            <li class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                    <i class="fa fa-envelope fa-fw"></i> <i class="fa fa-caret-down"></i>
                </a>
                <ul class="dropdown-menu dropdown-messages">
                    <li>
                        <a class="text-center" href="mailto:ouze2002@daum.net">
                            <strong>ouze2002@daum.net</strong>
                        </a>
                    </li>
                </ul>
                <!-- /.dropdown-messages -->
            </li>

        </ul>
        <!-- /.navbar-top-links -->

        <div class="navbar-default sidebar" role="navigation">
            <div class="sidebar-nav navbar-collapse">
                <ul class="nav" id="side-menu">
                    <li style="font-size: 17px">
                        <a href="index.html"><i class="fa fa-music fa-fw"></i> STRATOCASTER®</a>
                    </li>
                    <li>
                        <a href="#" onclick="javascript:bodyDtl()"><i class="fa fa-star fa-fw"></i> Body</a>
                    </li>

                    <li>
                        <a href="#" onclick="javascript:neckDtl()"><i class="fa fa-star fa-fw"></i> Neck</a>
                    </li>

                    <li>
                        <a href="#" onclick="javascript:pickupDtl()"><i class="fa fa-star fa-fw"></i> Pickup</a>
                    </li>

                    <li>
                        <a href="#" onclick="javascript:pickguardDtl()"><i class="fa fa-star fa-fw"></i> Pickguard</a>
                    </li>

                    <li>
                        <a href="#" onclick="javascript:switchDtl()"><i class="fa fa-star fa-fw"></i> Control Switch</a>
                    </li>

                    <li>
                        <a href="#" onclick="javascript:hardwareDtl()"><i class="fa fa-star fa-fw"></i> Hardware</a>
                    </li>

                </ul>
            </div>
            <!-- /.sidebar-collapse -->
        </div>
        <!-- /.navbar-static-side -->
    </nav>

    <div id="page-wrapper" style="height: 786px">
        <div class="col-lg-12">
            <div id="WebGL-info" style="position:absolute; width:100%; text-align:center; zIndex:100;"></div>
            <div class="row" id="WebGL-output" style="cursor:all-scroll;"></div>
        </div>
        <!-- Body -->
        <div id="body_dtl"  class="row" style="display:none">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Body Color
                    </div>
                    <div class="panel-body">
                        <div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#000000" class = "thumbnail" data-toggle="tooltip" title="Black"  onclick="chgBodyColor('#000000')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#fffff1" class = "thumbnail" data-toggle="tooltip" title="Olympic White"  onclick="chgBodyColor('#fffff1')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#dd1923" class = "thumbnail" data-toggle="tooltip" title="Fiesta Red"  onclick="chgBodyColor('#dd1923')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#ff0800" class = "thumbnail" data-toggle="tooltip" title="Candy Apple Red"  onclick="chgBodyColor('#ff0800')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#3f5c94" class = "thumbnail" data-toggle="tooltip" title="Lake Placid Blue"  onclick="chgBodyColor('#3f5c94')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#98c6c3" class = "thumbnail" data-toggle="tooltip" title="Daphne Blue"  onclick="chgBodyColor('#98c6c3')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#00887a" class = "thumbnail" data-toggle="tooltip" title="Ocean Turquoise"  onclick="chgBodyColor('#00887a')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#b4cfb0" class = "thumbnail" data-toggle="tooltip" title="Surf Green"  onclick="chgBodyColor('#b4cfb0')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#F1D3BB" class = "thumbnail" data-toggle="tooltip" title="Desert Sand"  onclick="chgBodyColor('#F1D3BB')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#8B4513" class = "thumbnail" data-toggle="tooltip" title="Sunburst"  onclick="chgBodyColor('#8B4513')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:80px">
                                <a href = "#" style="background:#C19A6B" class = "thumbnail" data-toggle="tooltip" title="Natural" onclick="chgBodyColor('#C19A6B')">
                                    &nbsp;
                                </a>
                            </div>
                            <div class = "col-sm-6 col-md-3" style="width:180px">
                                <span>Hex #</span> <input type="text" id="bodyCol" maxlength="6" style="width:60px"> <button type="button" class="btn btn-primary btn-xs" onclick="chgBodyColor('#'+$('#bodyCol').val())">apply</button>
                            </div>
                        </div>

                        <!-- /.nav-second-level -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Neck -->
        <div id="neck_dtl"  class="row" style="display:none">
            <div class="col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Neck
                    </div>
                    <div class="panel-body">
                        <select id="neck" class="form-control">
                            <option value="maple">Maple</option>
                            <option value="rosewood">Rosewood</option>
                        </select>
                        <!-- /.nav-second-level -->
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Fingerboard
                    </div>
                    <div class="panel-body">
                        <select id="fingerboard" class="form-control">
                            <option value="maple">Maple</option>
                            <option value="rosewood">Rosewood</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pickup -->
        <div id="pickup_dtl"  class="row" style="display:none">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Pickup Color
                    </div>
                    <div class="panel-body">
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#ffffff" class = "thumbnail" data-toggle="tooltip" title="White" onclick="chgPickupColor('#ffffff')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#000000" class = "thumbnail" data-toggle="tooltip" title="Black" onclick="chgPickupColor('#000000')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#F4E6BF" class = "thumbnail" data-toggle="tooltip" title="Aged White" onclick="chgPickupColor('#F5EBBF')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:180px">
                            <span>Hex #</span> <input type="text" id="pickupCol" maxlength="6" style="width:60px"> <button type="button" class="btn btn-primary btn-xs" onclick="chgPickupColor('#'+$('#pickupCol').val())">apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Pickguard -->
        <div id="pickguard_dtl"  class="row" style="display:none">
            <div class="col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Pickguard Ply
                    </div>
                    <div class="panel-body">
                        <select id="pickguard" class="form-control">
                            <option value="1ply">1 Ply</option>
                            <option value="3ply">3 Ply</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Pickguard Color
                    </div>
                    <div class="panel-body">
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#ffffff" class = "thumbnail" data-toggle="tooltip" title="White" onclick="chgPickguardColor('#ffffff')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#000000" class = "thumbnail" data-toggle="tooltip" title="Black" onclick="chgPickguardColor('#000000')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#E3F0DF" class = "thumbnail" data-toggle="tooltip" title="Mint Green" onclick="chgPickguardColor('#E3F0DF')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#FFD700" class = "thumbnail" data-toggle="tooltip" title="Gold Anodized Aluminum" onclick="chgPickguardColor('Gold')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#8b0000" class = "thumbnail" data-toggle="tooltip" title="Tortoise" onclick="chgPickguardColor('Tortoise')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:180px">
                            <span>Hex #</span> <input type="text" id="pickguardCol" maxlength="6" style="width:60px"> <button type="button" class="btn btn-primary btn-xs" onclick="chgPickguardColor('#'+$('#pickguardCol').val())">apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Control Switch -->
        <div id="switch_dtl" class="row" style="display:none">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Control Switch Color
                    </div>
                    <div class="panel-body">
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#ffffff" class = "thumbnail" data-toggle="tooltip" title="White" onclick="chgControlColor('#ffffff')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#000000" class = "thumbnail" data-toggle="tooltip" title="Black" onclick="chgControlColor('#000000')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#F4E6BF" class = "thumbnail" data-toggle="tooltip" title="Aged White" onclick="chgControlColor('#F4E6BF')">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:180px">
                            <span>Hex #</span> <input type="text" id="switchCol" maxlength="6" style="width:60px"> <button type="button" class="btn btn-primary btn-xs" onclick="chgControlColor('#'+$('#switchCol').val())">apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Hardware -->
        <div id="hardware_dtl" class="row" style="display:none">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Hardware Color
                    </div>
                    <div class="panel-body">
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#E3DEDB" class = "thumbnail" data-toggle="tooltip" title="Chrome" onclick="chgHardwareColor(0)">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#D4AF37" class = "thumbnail" data-toggle="tooltip" title="Gold" onclick="chgHardwareColor(0xD4AF37)">
                                &nbsp;
                            </a>
                        </div>
                        <div class = "col-sm-6 col-md-3" style="width:80px">
                            <a href = "#" style="background:#000000" class = "thumbnail" data-toggle="tooltip" title="Black" onclick="chgHardwareColor(0x353535)">
                                &nbsp;
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>
<!-- /#wrapper -->

<!-- jQuery -->
<script src="../vendor/jquery/jquery.min.js"></script>

<!-- Bootstrap Core JavaScript -->
<script src="../vendor/bootstrap/js/bootstrap.min.js"></script>

<!-- Metis Menu Plugin JavaScript -->
<script src="../vendor/metisMenu/metisMenu.min.js"></script>

<!-- Morris Charts JavaScript -->
<script src="../vendor/raphael/raphael.min.js"></script>
<script src="../vendor/morrisjs/morris.min.js"></script>
<script src="../data/morris-data.js"></script>

<!-- Custom Theme JavaScript -->
<script src="../dist/js/sb-admin-2.js"></script>

<!-- Javascript code that runs our Three.js -->
<script type="text/javascript" src="../libs/three.js"></script>
<script type="text/javascript" src="../libs/STLLoader.js"></script>
<script type="text/javascript" src="../libs/OrbitControls.js"></script>
<script type="text/javascript" src="../libs/ColladaLoader.js"></script>
<script type="text/javascript" src="../libs/bootstrap-waitingfor.min.js"></script>

<script src="../js/stratocaster.js"></script>
<script type="text/javascript">
    window.onload = setStratocaster();
    $(document).ready(function()        {
        $('#neck').change(function(){
            chgNeck( $('#neck option:selected').val() );
        });
        $('#fingerboard').change(function(){
            chgFingerBoard( $('#fingerboard option:selected').val() );
        });
        $('#pickguard').change(function(){
            if($('#pickguard option:selected').val() == '1ply') {
                chgPickguardColor( 0xffffff );
            } else {
                chgPickguardColor( 0xE3F0DF );
            }
        });
    });
    function allDtlClear() {
        $('#body_dtl').hide();
        $('#neck_dtl').hide();
        $('#pickup_dtl').hide();
        $('#pickguard_dtl').hide();
        $('#switch_dtl').hide();
        $('#hardware_dtl').hide();
    }

    function bodyDtl() {
        allDtlClear();
        $('#body_dtl').show();
    }

    function neckDtl() {
        allDtlClear();
        $('#neck_dtl').show();
    }

    function pickupDtl() {
        allDtlClear();
        $('#pickup_dtl').show();
    }

    function pickguardDtl() {
        allDtlClear();
        $('#pickguard_dtl').show();
    }

    function switchDtl() {
        allDtlClear();
        $('#switch_dtl').show();
    }

    function hardwareDtl() {
        allDtlClear();
        $('#hardware_dtl').show();
    }

</script>

</body>
</html>
