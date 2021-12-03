from django.urls import path

# from . import views
from .views import createMenu, browseMenu, createStaffProfile, browseStaffProfile, stock, login, orderMenu, table, timeInfo, analyze, pay, checkMenuTime

urlpatterns = [
    ### 1. 로그인
    # 1-2. 매니저 로그인 정보 입력
    path('manager/login/', login.loginManager),
    # 1-2. 직원 로그인 정보 입력
    path('staff/login/', login.loginStaff),
    # 1-3. 직원 PW 찾기
    path('findPW/', login.findPW),

    ### 3. 직원 프로필 생성
    path('createStaffProfile/', createStaffProfile.create),

    ### 4. 직원 프로필 열람/수정
    # 4-1. 프로필 목록
    path('browseStaffProfile/', browseStaffProfile.browse),
    # 4-2. 프로필 정보 열람
    path('detailStaffProfile/', browseStaffProfile.detail),
    # 4-3. 프로필 정보 수정
    path('modifyStaffProfile/', browseStaffProfile.modify),
    #추가) 프로필 정보 삭제
    path('deleteStaffProfile/', browseStaffProfile.delete),

    ### 5. 메뉴 등록
    path('createMenu/', createMenu.createMenu),

    ### 6. 메뉴 열람/수정
    # 6-1. 메뉴 목록
    path('browseMenu/', browseMenu.browseMenu),
    # 6-2. 메뉴 정보 열람
    path('getSelectedMenu/', browseMenu.getSelectedMenu),
    # 6-3. 메뉴 정보 수정
    path('modifyMenu/', browseMenu.modifyMenu),
    #추가) 메뉴 정보 삭제
    path('deleteMenu/', browseMenu.deleteMenu),

    ### 7. 시간 정보 열람
    path('browseTimeInfo/', timeInfo.browse),

    ### 8. 판매 분석
    # 8-1. 메뉴 별 인기도 목록
    path('browseAnalyze/', analyze.browse),
    # 8-2. 메뉴 별 주문량, 매출 비율, 총 매출액 확인
    path('detailAnalyze/', analyze.detail),

    ### 9. 재고 추적
    # 9-1. 재고 현황
    path('browseStock/', stock.browse),
    # 9-2. 재고 등록
    path('createStock/', stock.create),
    # 9-3. 재고 정보 열람
    path('detailStock/', stock.detail),
    # 9-4. 재고 정보 수정
    path('modifyStock/', stock.modify),
    #추가) 재고 정보 삭제
    path('deleteStock/', stock.delete),

    ### 10. 재고 주문
    # 10-1. 주문할 재고와 수량 선택
    path('orderStock/', stock.orderStock),
    # 10-2. 주문할 재고 정보 확인
    path('finishStock/', stock.finishStock),

    ### 11. 메뉴 주문
    # 11-1. 메뉴 선택 (전체 메뉴 반환)
    path('showMenu/', orderMenu.showMenu),
    # 11-1. 메뉴 선택 (수량 선택)
    path('orderMenu/', orderMenu.orderMenu),
    # 11-2. 주문 정보 확인 및 포장/매장 식사 여부 선택
    path('finishMenu/', orderMenu.finishMenu),
    # 11-3. 매장 식사 선택 시 테이블 선택
    path('orderTable/', orderMenu.orderTable),

    ### 13. 테이블 관리
    # 13-1. 현재 테이블 목록 확인
    path('showTable/', table.showTable),
    # 13-2. 테이블 별 정보 열람
    path('detailTable/', table.detailTable),
    # 13-3. 테이블 이동
    path('moveTable/', table.moveTable),
    
    ### 14. 메뉴 준비시간 체크
    # 14-1. 모든 메뉴 목록 확인
    path('showOrderMenu/', checkMenuTime.showOrderMenu),
    # 14-2. 메뉴 준비시간 체크
    path('checkMenuTime/', checkMenuTime.checkMenuTime),

    ### 0. 결제
    # 0-1. 결제 (결제 정보 확인)
    path('checkPay/', pay.check),
    # 0-2. 전체 결제 금액 확인
    path('totalPay/', pay.total),
    # 0-3. 결제 (현금&카드 결제)
    path('payment/', pay.payment),

]
