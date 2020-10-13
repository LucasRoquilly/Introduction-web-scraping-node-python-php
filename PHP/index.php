<?php
header('Content-Type: text/csv');
    require __DIR__ . "/vendor/autoload.php";
    use Goutte\Client;

    $client = new Client();
    $crawler = $client->request('GET', 'https://www.lemonde.fr');
    $r = [];
    $out = fopen('php://output', 'w');

    $crawler->filter('div.article > a')->each(function ($node) {
        global $r, $out;
        $url = $node->attr('href');
        $nom = trim($node->filter('.article__title')->text());        
        fputcsv($out, [$nom,$url]);
    });
    fclose($out);
?>