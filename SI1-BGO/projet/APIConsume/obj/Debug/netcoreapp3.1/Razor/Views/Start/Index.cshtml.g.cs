#pragma checksum "C:\Users\ahmed\Desktop\APIConsume\Views\Start\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ca35e3e3cce15e6389fc60f699382fb4f5a77bce"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Start_Index), @"mvc.1.0.view", @"/Views/Start/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\ahmed\Desktop\APIConsume\Views\_ViewImports.cshtml"
using APIConsume.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ca35e3e3cce15e6389fc60f699382fb4f5a77bce", @"/Views/Start/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"4ad71e7aaf8df096cf3bd076ea4d23ca580ef717", @"/Views/_ViewImports.cshtml")]
    public class Views_Start_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<IEnumerable<Reservation>>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "C:\Users\ahmed\Desktop\APIConsume\Views\Start\Index.cshtml"
  
    Layout = "_Layout";
    ViewData["Title"] = "Index";


#line default
#line hidden
#nullable disable
            WriteLiteral(@"<br />
<h1>BGO</h1>
<br />
<h2>Site de réservation de billet d'avion en ligne</h2>
<br />

<h3>Vérifier que le WEB-API fonctionne puis  <a href=""/Home"" target=""_blank"">Cliquer ici</a></h3>
<br />

<h4>Liste des vole allez retour sur la periode 01/01/21 - 31/01/21</h4>
<br />
<h5>En raison de la crise sanitaire mondiale actuel le nombre de vole ainsi que le nombre de destination disponible est grandement réduit</h5>
<br />
<table class=""table table-sm table-striped table-bordered m-2"">
    <thead>
        <tr>
           
            <th>Prix</th>
            <th>Origine</th>
            <th>Destination</th>
        </tr>
    </thead>
    <tr>
    
        <th>600€</th>
        <th>JFK</th>
        <th>CDG</th>
    </tr>
    <tr>
        <th>200€</th>
        <th>JFK</th>
        <th>DTW</th>
    </tr>
    <tr>
        <th>700€</th>
        <th>CDG</th>
        <th>DTW</th>
    </tr>
    <tr>
        <th>600€</th>
        <th>CDG</th>
        <th>JFK</th>
    </tr>
  ");
            WriteLiteral("  <tr>\r\n        <th>200€</th>\r\n        <th>DTW</th>\r\n        <th>JFK</th>\r\n    </tr>\r\n    <tr>\r\n        <th>700€</th>\r\n        <th>DTW</th>\r\n        <th>CDG</th>\r\n    </tr>\r\n</table>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<IEnumerable<Reservation>> Html { get; private set; }
    }
}
#pragma warning restore 1591
