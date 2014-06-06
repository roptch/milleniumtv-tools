NAME		=	milleniumtv-tools.zip
BUILD_DIR	=	build
ZIP			=	zip -r
RM			=	rm -rf
MKDIR		=	mkdir -p

FILES		=	manifest.json		\
				background.js		\
				content-script.js	\
				popup.html			\
				popup.css			\
				popup.js

DIRS		=	images

###################################################

all						:	$(BUILD_DIR) $(BUILD_DIR)/$(NAME)

$(BUILD_DIR)			:
							$(MKDIR) $(BUILD_DIR)

$(BUILD_DIR)/$(NAME)	:	$(FILES) $(DIRS)
							$(ZIP) $(BUILD_DIR)/$(NAME) $(FILES) $(DIRS)

fclean					:
							$(RM) $(NAME)

re						:	fclean all

.PHONY					:	all fclean re
