FROM mcr.microsoft.com/devcontainers/base:alpine AS base
USER vscode
SHELL ["/bin/bash", "--login", "-c"]

ARG NODE_VERSION=18.15.0
ARG NVM_VERSION=0.39.3
ARG USER=vscode
ARG HOME=/home/$USER
ARG NVM_DIR=$HOME/.nvm
ARG NVM_NODEJS_ORG_MIRROR=https://unofficial-builds.nodejs.org/download/release

# Needed for initial configuration
RUN mkdir $HOME/.config && \
	mkdir $HOME/.config/vscode-dev-containers

FROM base as update
RUN sudo apk -U upgrade
# sudo apk del nodejs nodejs-current

FROM update AS node
WORKDIR $HOME
# Download nvm, add config to .zshrc, source .zshrc
USER vscode
# libstdc++ and coreutils are needed for node, libc6-compat for turborepo
RUN sudo apk add --no-cache libstdc++ coreutils libc6-compat git-flow curl && \
	mkdir $NVM_DIR && \
	echo "export NVM_DIR=$NVM_DIR" >> $HOME/.bashrc && \
	echo "export NVM_NODEJS_ORG_MIRROR=$NVM_NODEJS_ORG_MIRROR" >> $HOME/.bashrc && \
	echo "[ -s \"\$NVM_DIR/nvm.sh\" ] && \. \"\$NVM_DIR/nvm.sh\"" >> $HOME/.bashrc && \
	echo "[ -s \"\$NVM_DIR/bash_completion\" ] && \. \"\$NVM_DIR/bash_completion\"" >> $HOME/.bashrc && \
	echo "nvm_get_arch() { nvm_echo \"x64-musl\"; }" >> $HOME/.bashrc && \
	git clone https://github.com/nvm-sh/nvm.git $NVM_DIR
WORKDIR $NVM_DIR
RUN git checkout v$NVM_VERSION && \
	source $NVM_DIR/nvm.sh && \
	source $HOME/.bashrc && \
	nvm install $NODE_VERSION
	
FROM node AS pnpm
WORKDIR $HOME
USER root
RUN mkdir /usr/local/lib/node_modules && \
	chmod -R 777 /usr/local/lib/node_modules && \
	source $HOME/.bashrc && \
	npm install -g pnpm turbo nx lerna postcss-cli && \
	sudo chown -R $USER "$HOME/.npm" && \
	echo "export PNPM_HOME="$HOME/.local/share/pnpm"" >> $HOME/.bashrc && \
	echo "case \":\$PATH:\" in" >> $HOME/.bashrc && \
	echo "  *\":\$PNPM_HOME:\"*) ;;" >> $HOME/.bashrc && \
	echo "  *) export PATH=\"\$PNPM_HOME:\$PATH\" ;;" >> $HOME/.bashrc && \
	echo "esac" >> $HOME/.bashrc && \
	echo "alias npm='pnpm'" >> $HOME/.bashrc
