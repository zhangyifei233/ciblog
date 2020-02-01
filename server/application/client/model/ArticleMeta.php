<?php

namespace app\client\model;

use think\Model;
use think\Db;
use think\Exception;

class ArticleMeta extends Model
{
    public function addArticleMeta()
    {
        $this->save();
    }
    public static function addMetaList($data, $aid, $type)
    {
        foreach ($data as $value) {
            $ArticleMeta = new ArticleMeta([
                'aid'  =>  $aid,
                'mid' =>  $value,
                'type' => $type
            ]);
            $ArticleMeta->addArticleMeta();
        };
    }
    public static function getMetaByArticle($aid, $type)
    {
        return ArticleMeta::all(['aid' => $aid, 'type' => $type]);
    }
    public static function delAllMetaByArticle($aid, $type)
    {
        ArticleMeta::destroy(['aid' => $aid, 'type' => $type]);
    }
}