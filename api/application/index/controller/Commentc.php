<?php

namespace app\index\controller;

use think\Controller;
use app\index\model\Comment;
use app\index\model\Article;
use think\Exception;
use app\common\Response;
use think\Db;

class Commentc extends Controller
{
    /**
     * 控制器默认方法 获取评论列表
     *
     * @param JSON $paging 分页信息
     * @return JSON 
     */
    public function index($paging)
    {
        try {
            $comment = new Comment();
            $data = $comment->getCommentList($paging);
            foreach ($data as $value) {
                $title = Article::get($value['aid'])['title'];
                $value['title'] = $title;
            }
            return Response::result(201, "成功", "数据获取成功!", $data, $paging);
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 修改评论状态
     *
     * @param int $cid
     * @param int $status
     * @return JSON
     */
    public function editstatus($cid, $status)
    {
        try {
            $comment = new Comment();
            $comment->editStutas($cid, $status);
            return Response::result(200, "成功", "状态修改成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败", $e->getMessage());
        }
    }
    /**
     * 删除评论
     *
     * @param array $cid 评论id 或者 评论id数组 
     * @return JSON
     */
    public function del($cid)
    {
        try {
            Comment::destroy($cid);
            return Response::result(200, "成功", "评论删除成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 编辑评论
     *
     * @param array $cid 评论cid
     * @return JSON
     */
    public function edit($cid, $content)
    {
        try {
            $comment = Comment::get($cid);
            $comment->content = $content;
            $comment->save();
            return Response::result(200, "成功", "评论修改成功!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 根据评论id获取内容
     *
     * @param int $cid 评论id
     * @return JSON
     */
    public function byid($cid)
    {
        try {
            $data = Comment::get($cid);
            return Response::result(201, "成功", "评论信息获取成功!", $data);
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
    /**
     * 新增评论
     *
     * @param object $data 文章内容
     * @return JSON
     */
    public function add($data)
    {
        try {
            $article = Article::get($data["aid"]);
            if ($article->allow_comment === 1) {
                $comment = new Comment();
                $comment->data([
                    'aid' => $data["aid"],
                    'content' => $data["content"],
                    'nickname' => $data["nickname"],
                    'email' => $data["email"],
                    'create_date' => date('Y-m-d H:i:s'),
                    'status' => 1,
                    'ip' => $_SERVER['REMOTE_ADDR'],
                    'avatar_url' => $data['avatar_url']
                ]);
                $comment->save();
                return Response::result(200, "成功", "评论成功!");
            }
            return Response::result(400, "失败", "该文章已关闭评论!");
        } catch (Exception $e) {
            return Response::result(400, "请求失败!", $e->getMessage());
        }
    }
}