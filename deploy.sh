#!/bin/bash

# 部署脚本
# 用于构建和部署Markdown编辑器应用

# 设置错误时终止
set -e

# 定义颜色
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # 无颜色

# 输出带颜色的信息
info() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
  echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# 检查依赖项
check_dependencies() {
  info "检查依赖项..."
  
  if ! command -v node &> /dev/null; then
    error "Node.js 未安装，请先安装 Node.js"
    exit 1
  fi
  
  if ! command -v npm &> /dev/null; then
    error "npm 未安装，请先安装 npm"
    exit 1
  fi
  
  info "依赖项检查完成 ✅"
}

# 设置npm镜像
setup_npm_registry() {
  info "设置npm镜像为淘宝镜像..."
  npm config set registry https://registry.npmmirror.com
  info "npm镜像设置完成 ✅"
}

# 恢复npm默认镜像
restore_npm_registry() {
  info "恢复npm默认镜像..."
  npm config set registry https://registry.npmjs.org
  info "npm镜像恢复完成 ✅"
}

# 安装依赖
install_dependencies() {
  info "安装项目依赖..."
  
  # 添加重试逻辑
  local max_attempts=3
  local attempt=1
  
  while [ $attempt -le $max_attempts ]; do
    info "尝试安装依赖 (尝试 $attempt/$max_attempts)..."
    
    if npm install; then
      info "依赖安装完成 ✅"
      return 0
    else
      if [ $attempt -lt $max_attempts ]; then
        warn "依赖安装失败，将在5秒后重试..."
        sleep 5
      else
        error "依赖安装失败，已达到最大重试次数"
        return 1
      fi
    fi
    
    attempt=$((attempt + 1))
  done
}

# 检查端口
check_port() {
  local port=$1
  
  if lsof -i :$port > /dev/null; then
    warn "端口 $port 已被占用，尝试释放..."
    kill $(lsof -t -i:$port) || {
      error "无法释放端口 $port"
      exit 1
    }
    info "端口 $port 已释放 ✅"
  else
    info "端口 $port 可用 ✅"
  fi
}

# 构建应用
build_app() {
  info "构建应用..."
  npm run build
  info "应用构建完成 ✅"
}

# 运行开发环境
run_dev() {
  info "启动开发服务器..."
  check_port 3000
  npm run dev
}

# 运行预览
run_preview() {
  info "启动预览服务器..."
  check_port 3000
  npm run preview
}

# 根据参数执行不同操作
case "$1" in
  dev)
    check_dependencies
    setup_npm_registry
    install_dependencies
    run_dev
    ;;
  build)
    check_dependencies
    setup_npm_registry
    install_dependencies
    build_app
    ;;
  preview)
    check_dependencies
    setup_npm_registry
    install_dependencies
    build_app
    run_preview
    ;;
  *)
    echo "使用方法: $0 {dev|build|preview}"
    echo ""
    echo "命令:"
    echo "  dev       安装依赖并启动开发服务器"
    echo "  build     构建生产版本"
    echo "  preview   构建并预览生产版本"
    exit 1
    ;;
esac

# 恢复npm默认镜像
restore_npm_registry

exit 0 