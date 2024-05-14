<Typography
                variant='h6'
            >
            워너비를 시작해 볼까요?
            </Typography>
            <BackgroundBox
                style={{
                    width:'100%',
                    marginTop:'36px',
                    padding: '32px'
                }}
            >
                <Typography
                    variant='h8'
                    style={{
                        marginTop:'36px'
                    }}
                >
                먼저, 이메일이 필요해요!
                </Typography>
                <TextField
                    required
                    variant="outlined"
                    color="white"
                    id="email"
                    label="이메일을 입력해 주세요"

                    error={errors.email ? true : false}
                    helperText={errors.email && "이메일은 필수 입력값입니다."}
                    style={{
                        marginTop:'16px'
                    }}
                    />
                <Button
                    variant="contained"
                    color='secondary'
                    style={{
                        width:'100%',
                        margin:'72px auto 0'
                    }}
                    onClick={
                        () => navigate('/signup')
                    }
                >
                계속하기
                </Button>
            </BackgroundBox>